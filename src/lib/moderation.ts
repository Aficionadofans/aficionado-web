/**
 * Video content moderation helper.
 * Uses Sightengine API (nudity-2.0 model) or OpenAI Vision API
 * to detect adult/NSFW content in video frame thumbnails.
 */

export interface ModerationResult {
  isAdult: boolean
  reason?: string
  confidence?: number
}

/**
 * Checks an array of thumbnail image URLs for adult/NSFW content.
 */
export async function checkVideoThumbnails(imageUrls: string[]): Promise<ModerationResult> {
  const sightengineUser = process.env.SIGHTENGINE_USER
  const sightengineSecret = process.env.SIGHTENGINE_SECRET
  const openAiKey = process.env.OPENAI_API_KEY

  // 1. Try Sightengine API if credentials are set and valid
  if (sightengineUser && sightengineSecret && sightengineUser !== 'your_sightengine_user_id') {
    for (const url of imageUrls) {
      try {
        const params = new URLSearchParams({
          url,
          models: 'nudity-2.0,wad',
          api_user: sightengineUser,
          api_secret: sightengineSecret,
        })
        const res = await fetch(`https://api.sightengine.com/1.0/check.json?${params.toString()}`)
        if (res.ok) {
          const data = await res.json()
          if (data.status === 'success' && data.nudity) {
            const nudity = data.nudity
            // Check for raw nudity, explicit sexual activity, or heavy partial nudity
            const isExplicit =
              (nudity.sexual_activity ?? 0) > 0.3 ||
              (nudity.sexual_display ?? 0) > 0.3 ||
              (nudity.erotica ?? 0) > 0.6 ||
              (nudity.very_suggestive ?? 0) > 0.7

            if (isExplicit) {
              return {
                isAdult: true,
                reason: 'Explicit or adult content detected by Sightengine AI',
                confidence: Math.max(
                  nudity.sexual_activity ?? 0,
                  nudity.sexual_display ?? 0,
                  nudity.erotica ?? 0,
                ),
              }
            }
          }
        }
      } catch (err) {
        console.error('Sightengine moderation error:', err)
      }
    }
  }

  // 2. Try OpenAI Vision API as secondary fallback if API key is configured
  if (openAiKey && openAiKey !== 'your_openai_api_key') {
    for (const url of imageUrls) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: 'Analyze this image thumbnail for adult, sexually explicit, or NSFW content. Respond with JSON: {"isAdult": boolean, "reason": string}. Only flag explicit adult content.',
                  },
                  {
                    type: 'image_url',
                    image_url: { url },
                  },
                ],
              },
            ],
            response_format: { type: 'json_object' },
            max_tokens: 100,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? '{}')
          if (parsed.isAdult) {
            return {
              isAdult: true,
              reason: parsed.reason || 'Adult content detected by OpenAI Vision',
            }
          }
        }
      } catch (err) {
        console.error('OpenAI Vision moderation error:', err)
      }
    }
  }

  // If clean or no moderation keys configured
  return { isAdult: false }
}

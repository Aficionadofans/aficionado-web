import { WatchPartyTheater } from '@/features/live/ui/WatchPartyTheater'

export default async function LiveWatchPartyPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  return <WatchPartyTheater username={username} />
}

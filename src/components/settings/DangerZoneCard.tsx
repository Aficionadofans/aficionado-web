import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export function DangerZoneCard() {
  return (
    <Card className="liquid-glass-hover border-destructive/20 overflow-hidden animate-fade-in-up transition-all duration-500" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Irreversible actions related to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-destructive/5 border border-destructive/10">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-sm font-medium text-off-white">Delete Account</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              Permanently remove your account, all check-ins, posts, and data from our servers. This cannot be undone.
            </p>
          </div>
          <button className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-full text-sm font-medium hover:bg-destructive hover:text-destructive-foreground transition-all">
            Delete Account
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

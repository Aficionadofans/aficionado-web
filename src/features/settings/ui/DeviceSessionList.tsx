import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/core/card'
import { Laptop, Smartphone } from 'lucide-react'

export function DeviceSessionList() {
  return (
    <Card className="liquid-glass-hover border-white/10 overflow-hidden animate-fade-in-up transition-all duration-500" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle className="text-off-white flex items-center gap-2">
          <Laptop className="w-5 h-5 text-muted-foreground" />
          Active Sessions
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Devices currently logged into your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <Laptop className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-off-white">Mac OS • Chrome</p>
                <p className="text-xs text-muted-foreground">Current Session</p>
              </div>
            </div>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">Active</span>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 opacity-70">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-off-white">iOS • Safari</p>
                <p className="text-xs text-muted-foreground">Last active 2 days ago</p>
              </div>
            </div>
            <button className="text-xs text-muted-foreground hover:text-destructive transition-colors">
              Revoke
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

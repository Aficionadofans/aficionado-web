import { CreatorStudio } from "@/features/studio/ui/CreatorStudio";
import { createClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CreatorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("user_type")
      .eq("id", user.id)
      .single();

    if (profile?.user_type === "fan") {
      redirect("/home");
    }
  } else {
    redirect("/login");
  }

  // Fetch active subscriber count
  const { count, error } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("creator_id", user.id)
    .eq("status", "active");

  const activeSubscribers = count || 0;
  
  // Approximate total earnings
  const totalEarnings = activeSubscribers * 9.99;

  // Approximate total views by summing likes_count from content table
  const { data: contentData } = await supabase
    .from("content")
    .select("likes_count")
    .eq("creator_id", user.id); // Assuming content table has creator_id based on user_id.

  const totalViews = (contentData || []).reduce((acc: number, curr: any) => acc + (curr.likes_count || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <CreatorStudio 
        activeSubscribers={activeSubscribers} 
        totalEarnings={totalEarnings}
        totalViews={totalViews}
      />
    </div>
  );
}

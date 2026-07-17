// app/(app)/layout.tsx
import Sidebar from "@/components/navigation/sidebar";
import MobileHeader from "@/components/navigation/mobile-header";
import RightPanel from "@/components/navigation/right-panel";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      {/* Левый сайдбар (Desktop) */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-zinc-800 p-4 fixed h-full">
        <Sidebar />
      </aside>

      {/* Основной контейнер с отступом слева на десктопе */}
      <main className="flex-1 flex flex-col md:pl-64 lg:pr-80 min-h-screen pb-16 md:pb-0">
        <MobileHeader /> {/* Виден только на мобильных */}
        <div className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>

      {/* Правая панель с виджетами (Desktop Large) */}
      <aside className="hidden lg:flex lg:w-80 border-l border-zinc-800 p-4 fixed right-0 h-full">
        <RightPanel />
      </aside>
    </div>
  );
}
import SideNav from '@/components/ui/sidenav';

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-row">
            <SideNav />
            <div className='basis-full'>
                {children}
            </div>
        </div>
    )
}
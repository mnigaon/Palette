export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // [locale]/layout.tsx 가 실제 html/body를 렌더링합니다
    return children as React.ReactElement;
}

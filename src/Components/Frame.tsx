import { ReactNode } from "react";

export default function Frame({ children }: { children: ReactNode }) {
    return <div className="frame">{children}</div>
}
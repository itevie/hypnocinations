import { ReactNode } from "react";

export default function Box({ children }: { children: ReactNode }) {
    return <div className="box">{children}</div>
}
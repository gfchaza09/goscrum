import { render, screen } from "@testing-library/react";
import { Donate } from "./Donate";

describe("renderizado en donate", ()=>{
    it("Renderiza un h1", () => {
        render(<Donate />)
    
        expect(screen.getByRole("heading", {level: 1, name:"Colaborá con el proyecto"})).toBeInTheDocument()
    })
    
    it("Renderiza un a con href", () => {
        render(<Donate />)
    
        expect(screen.getByRole("link")).toHaveAttribute("href", "#")
    })

    it("Renderiza un a con target _blank", () => {
        render(<Donate />)
    
        expect(screen.getByRole("link")).toHaveAttribute("target", "_blank")
    })
})

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.styles.css';
import { useEffect, useState } from 'react';

export const Header = () => {

    const navigate = useNavigate();

    const { tasks } = useSelector(state => {
        return state.tasksReducer;
    })

    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });
    
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 610 && menuOpen) {
            setMenuOpen(false);
            document.getElementById("navMenu").classList.toggle("active");
        };
    }, [size.width, menuOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/login", {replace: true});
    }

    const handleMenuToggle = e => {
        e.currentTarget.classList.toggle("active");
        setMenuOpen(!menuOpen);
    }

    return (
        <header>
            <img alt="logo" src="/img/go-scrum.png" />
            <div className={`wrapper_right_header ${menuOpen ? "show_menu" : ""}`}>
                <div>
                    <button onClick={()=>navigate("/donate", {replace: true})}>
                        Donar
                    </button>
                </div>
                <div>Tareas creadas:{tasks?.length}</div>
                <div>{localStorage.getItem("userName")}</div>
                <div className="close_button" onClick={handleLogout}>x</div>
            </div>
            <div id="navMenu" onClick={handleMenuToggle}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    );
}
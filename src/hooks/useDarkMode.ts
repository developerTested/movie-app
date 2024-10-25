import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { toggleTheme } from "@/redux/slices/themeSlice";

export default function useDarkMode() {

    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch();

    // const [theme, setTheme] = useState<string>('light');
    const [dark, setDark] = useState(false);
    const setTheme = () => {
        if (theme === 'dark') {
            window.localStorage.setItem('theme', 'light')
            dispatch(toggleTheme("light"));
            setDark(false);
        } else {
            window.localStorage.setItem('theme', 'dark')
            dispatch(toggleTheme("dark"))
            setDark(true);
        }

        console.log("Current", theme);

    };

    useEffect(() => {
        document.body.classList.toggle('dark');
    }, [dark]);

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && dispatch(toggleTheme(localTheme));

        console.log("Local", localTheme);


        if (localTheme === 'dark') {
            document.body.classList.toggle('dark');
            setDark(true);
        }

    }, []);

    return { theme, setTheme }
};
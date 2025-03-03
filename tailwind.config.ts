/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // class 기반 다크모드 사용
    theme: {
        extend: {
            screens: {
                'sm': '390px',    // 모바일
                'md': '1024px',    // 태블릿
                'lg': '1025px',   // 데스크탑
                'xl': '1400px',   // 와이드 데스크탑
            },
            colors: {
                primary: '#FF0000',
                secondary: '#00FF00',
            },
            fontFamily: {
                sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif']
            },
        },
    },
    plugins: [],
} 
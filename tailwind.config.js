import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			extend: {
				colors: {
					theme: {
						light: '#ffffff',
						dark: '#0e0e0e'
					},
					primary: {
						50: '#e1e1e1',
						100: '#c3c3c3',
						200: '#8a8a8a',
						300: '#575757',
						400: '#2d2d2d',
						500: '#0e0e0e',
						600: '#000000',
						700: '#000000',
						800: '#000000',
						900: '#020202'
					},
					secondary: {
						50: '#edd9fb',
						100: '#ceb4f7',
						200: '#7772ee',
						300: '#3e66e3',
						400: '#1d69d3',
						500: '#1064be',
						600: '#1651a3',
						700: '#243b82',
						800: '#2f2d5e',
						900: '#2d2837'
					},
					tertiary: {
						50: '#fddde6',
						100: '#fabdd1',
						200: '#f481ae',
						300: '#eb5095',
						400: '#dc3083',
						500: '#c82274',
						600: '#ac2566',
						700: '#8a2f58',
						800: '#633547',
						900: '#392b30'
					},
					field: {
						50: '#e4f9d4',
						100: '#bbf4ac',
						200: '#65e77e',
						300: '#2ed984',
						400: '#0cc88f',
						500: '#01b289',
						600: '#09976c',
						700: '#1a7949',
						800: '#26572f',
						900: '#273324'
					}
				}
			},
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
					50: '#e1e1e1',
					100: '#c3c3c3',
					200: '#8a8a8a',
					300: '#575757',
					400: '#2d2d2d',
					500: '#0e0e0e',
					600: '#000000',
					700: '#000000',
					800: '#000000',
					900: '#020202'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
					50: '#edd9fb',
					100: '#ceb4f7',
					200: '#7772ee',
					300: '#3e66e3',
					400: '#1d69d3',
					500: '#1064be',
					600: '#1651a3',
					700: '#243b82',
					800: '#2f2d5e',
					900: '#2d2837'
				},
				tertiary: {
					50: '#fddde6',
					100: '#fabdd1',
					200: '#f481ae',
					300: '#eb5095',
					400: '#dc3083',
					500: '#c82274',
					600: '#ac2566',
					700: '#8a2f58',
					800: '#633547',
					900: '#392b30'
				},
				field: {
					50: '#e4f9d4',
					100: '#bbf4ac',
					200: '#65e77e',
					300: '#2ed984',
					400: '#0cc88f',
					500: '#01b289',
					600: '#09976c',
					700: '#1a7949',
					800: '#26572f',
					900: '#273324'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	}
};

export default config;

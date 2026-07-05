import Logo from '@/Components/Logo';

export default function ApplicationLogo(props) {
    return <Logo className={props.className || 'h-10 w-auto object-contain'} />;
}

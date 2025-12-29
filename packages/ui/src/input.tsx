


export default function input({ className, value, onChange }: { className: string, value: string | number, onChange: any }) {
    return (
        <input className={className} value={value} onChange={onChange} />
    );
}
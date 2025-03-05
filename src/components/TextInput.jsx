

function TextInput({
    placeholder,
    value,
    setValue,
    type
}) {

    return (
        <>
            <div>
                <input
                    value={value}
                    onChange={setValue}
                    placeholder={placeholder}
                    type={type}
                />
            </div>
        </>
    )
}

export default TextInput

import {useState} from 'react'
function useFormInput(initialValue: any) {
	const [value, setValue] = useState(initialValue);
	function handleChange(e: any) {
		setValue(e.target.value);
	}
	
	return {
		value,
		onChange: handleChange
	};
}

export {
    useFormInput,
}
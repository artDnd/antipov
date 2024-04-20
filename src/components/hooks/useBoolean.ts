import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

type UseBooleanReturn = {
	visible: boolean
	setVisible: Dispatch<SetStateAction<boolean>>
	setTrue: () => void
	setFalse: () => void
	toggle: () => void
}

export function useBoolean(defaultValue = false): UseBooleanReturn {
	if (typeof defaultValue !== 'boolean') {
		throw new Error('defaultValue must be `true` or `false`')
	}
	const [visible, setVisible] = useState(defaultValue)

	const setTrue = useCallback(() => {
		setVisible(true)
	}, [])

	const setFalse = useCallback(() => {
		setVisible(false)
	}, [])

	const toggle = useCallback(() => {
		setVisible(x => !x)
	}, [])

	return { visible, setVisible, setTrue, setFalse, toggle }
}

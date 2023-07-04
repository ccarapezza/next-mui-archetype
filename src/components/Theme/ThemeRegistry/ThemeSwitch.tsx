import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { IconButton, Tooltip } from '@mui/material'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (<>
    <Tooltip title="Toggle light/dark theme">
      <IconButton className='hidden dark:block' size='small' onClick={() => setTheme("light")}>
        <FontAwesomeIcon fixedWidth icon={faSun} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Toggle light/dark theme">
      <IconButton className='block dark:hidden' size='small' onClick={() => setTheme("dark")}>
        <FontAwesomeIcon fixedWidth icon={faMoon} />
      </IconButton>
    </Tooltip>
  </>)
}

export default ThemeSwitch
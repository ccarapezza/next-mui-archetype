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
      <IconButton className='hidden dark:block' size='small'>
        <FontAwesomeIcon fixedWidth icon={faSun} onClick={() => setTheme("light")} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Toggle light/dark theme">
      <IconButton className='block dark:hidden' size='small'>
        <FontAwesomeIcon fixedWidth icon={faMoon} onClick={() => setTheme("dark")} />
      </IconButton>
    </Tooltip>
  </>)
}

export default ThemeSwitch
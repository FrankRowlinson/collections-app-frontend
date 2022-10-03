import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

function ThemeToggler() {
  const [value, setValue] = useState([])

  const handleChange = (val) => setValue(val)

  return (
    <>
      <Helmet>
        {value[0] ? (
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.2.1/darkly/bootstrap.min.css"
            integrity="sha512-BUdXMTpY4ru6TUZ3S/saZqxVzmv3FiyOLD4PaLDbH2hF2hrtdV7CYjACN2AqOJnVZMstFH/6bfUaAetxe8XlRQ=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
        ) : (
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.2.1/flatly/bootstrap.min.css"
            integrity="sha512-wIYoddftNw7JnaeYbKG4yL4CGGBYBhmcFEw8qobAu8zsDmEW/ZxfeWXyNbiUZ4BE5me64k2JuJRP9r2/i0Ty1Q=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
        )}
      </Helmet>
      <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
        <ToggleButton id="tbg-btn-1" value={1}>
          Theme
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}

export default ThemeToggler

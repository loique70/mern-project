import { Outlet } from 'react-router-dom'
import DashFooter from './DashFooter'
import DashHeader from './DashHeader'

const DashLayourt = () => {
  return (
    < >
        <DashHeader />
        <hr/>
        <div className='dash-container'>
            <Outlet />
        </div>
        <hr/>
        <DashFooter />
    </>
  )
}

export default DashLayourt

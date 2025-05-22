import React from 'react'
import DashboardProvider from './provider'
import { Toaster } from '@/components/ui/sonner'

const LayoutDashboard = ({ children }) => {
    return (
        <div className='bg-secondary'>
            <DashboardProvider>
                <div className='p-10'>
                    {children}
                    <Toaster />
                </div>
            </DashboardProvider>
        </div>
    )
}

export default LayoutDashboard

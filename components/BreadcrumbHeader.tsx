'use client';
import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbLink,
} from './ui/breadcrumb';
import React from 'react';
import { MobileSideBar } from './SideBar';

function BreadcrumbHeader() {
    const pathName = usePathname();
    const paths = pathName === '/' ? [''] : pathName?.split('/');

    return (
        <div className='flex items-center flex-start'>
            <MobileSideBar />
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className='capitalize'
                                    href={`/${path}`}
                                >
                                    {path === '' ? 'home' : path}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbHeader;

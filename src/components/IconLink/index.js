import cn from 'classnames';
import { MdWeb, MdEmail } from 'react-icons/md'
import { IoLogoYoutube, IoLogoInstagram, IoLogoFacebook, IoLogoTiktok, IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5'

import style from './style.scss';

export default function IconLink({ className, href }) {
    let Icon = MdWeb
    if (~href.indexOf('mailto:'))   Icon = MdEmail
    if (~href.indexOf('youtube'))   Icon = IoLogoYoutube
    if (~href.indexOf('instagram')) Icon = IoLogoInstagram
    if (~href.indexOf('facebook'))  Icon = IoLogoFacebook
    if (~href.indexOf('tiktok'))    Icon = IoLogoTiktok
    if (~href.indexOf('linkedin'))  Icon = IoLogoLinkedin
    if (~href.indexOf('twitter'))   Icon = IoLogoTwitter
    return (
        <a className={cn(className, style.container)} href={href}><Icon /></a>
    )
}

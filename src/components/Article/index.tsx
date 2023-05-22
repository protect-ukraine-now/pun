import cn from 'clsx'

import style from './style.module.scss'

const Article = ({ className, children }) => {
	return (
		<article className={cn(className, style.container)}>
			{children}
		</article>
	)
}

export default Article

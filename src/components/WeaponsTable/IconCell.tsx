import cn from 'clsx'

import style from './style.module.scss'
import { useText } from 'src/tools/language'
import { AmmoIconMap } from './maps'

const IconCell = ({ category }) => {
	const text = useText()
	const icon = AmmoIconMap[category]

	return (
		<div className={cn(style.category, style.cell)}>
			<div className={style.icon} style={{ backgroundImage: `url("${icon}")` }}/>
			<div className={style.label}>
				{text(`weapon_category.${category}`)}
			</div>
		</div>
	)
}

export default IconCell

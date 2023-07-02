import cn from 'clsx'

import styles from './styles.module.scss'

const Index = ({ className, children }) => (
    <div className={cn(className, styles.container)}>
        {children}
    </div>
)

export default Index

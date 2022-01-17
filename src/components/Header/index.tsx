import styles from './header.module.scss'

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContent}>
        <img src="/images/Logo.svg" alt="logo" />
      </div>

    </div>
  )
}

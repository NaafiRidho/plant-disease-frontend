'use client';

import { motion } from 'framer-motion';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import styles from '@/app/dashboard/dashboard.module.css';

export default function DashboardTopbar() {
  const { user } = useAuth();

  const displayName = user ? user.username : 'Dr. Aris Thorne';
  const displayRole = user?.role ? user.role.toUpperCase() : 'CHIEF AGRONOMIST';
  const initials = displayName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.header
      className={styles.topbar}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.searchBox}>
        <Search size={15} className={styles.searchIcon} />
        <span className={styles.searchPlaceholder}>
          Search cultivars, pathogens, or zones...
        </span>
      </div>

      <div className={styles.topbarIcons}>
        <button className={styles.topbarIcon} title="Notifications" aria-label="Notifications">
          <Bell size={19} />
        </button>
        <button className={styles.topbarIcon} title="Help" aria-label="Help">
          <HelpCircle size={19} />
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.userArea}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{displayName}</div>
          <div className={styles.userRole}>{displayRole}</div>
        </div>
        <div className={styles.avatar}>{initials}</div>
      </div>
    </motion.header>
  );
}

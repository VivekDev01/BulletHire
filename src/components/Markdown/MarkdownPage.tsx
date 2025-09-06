import ReactMarkdown from 'react-markdown'
import styles from './MarkdownPage.module.css'

interface MarkdownPageProps {
    markdown: string;
}

export default function MarkdownPage({ markdown }: MarkdownPageProps) {
    return (
        <div className={styles.markdown_content}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
}
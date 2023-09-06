import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'

// install @types/draft-js @types/react-draft-wysiwyg and @types/draft-js @types/react-draft-wysiwyg for types

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

export default Editor
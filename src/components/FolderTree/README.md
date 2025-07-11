# FolderTree Component

A comprehensive, hierarchical folder tree component for React applications. Built with TypeScript, designed for scalability and easy maintenance.

## Features

- 🌳 **Hierarchical Structure**: Supports unlimited nesting levels
- 🔄 **Expand/Collapse**: Interactive folder expansion with visual indicators
- ✅ **Selection**: Single folder selection with visual feedback
- ➕ **CRUD Operations**: Add and delete folders with confirmation dialogs
- 🎨 **Modern UI**: Clean, responsive design with hover states
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 🚀 **React Query Ready**: Designed for easy API integration
- 📱 **Responsive**: Works on desktop and mobile devices

## Installation

```bash
# The component uses these peer dependencies:
npm install lucide-react
```

## Basic Usage

```tsx
import { FolderTree } from '@/components/FolderTree'
import type { FolderNode } from '@/components/FolderTree'

const folders: FolderNode[] = [
  {
    id: 'root',
    name: 'Root Folder',
    type: 'folder',
    children: [
      {
        id: 'folder-1',
        name: 'Documents',
        type: 'folder',
        children: []
      }
    ]
  }
]

function MyComponent() {
  const [selectedFolder, setSelectedFolder] = useState('root')

  const handleFolderSelect = (folderId: string, folderName: string) => {
    setSelectedFolder(folderId)
    console.log(`Selected: ${folderName} (${folderId})`)
  }

  const handleAddFolder = async (parentId: string, folderName: string) => {
    // Your API call here
    console.log(`Adding ${folderName} to ${parentId}`)
  }

  const handleDeleteFolder = async (folderId: string) => {
    // Your API call here
    console.log(`Deleting ${folderId}`)
  }

  return <FolderTree folders={folders} selectedFolder={selectedFolder} onFolderSelect={handleFolderSelect} onAddFolder={handleAddFolder} onDeleteFolder={handleDeleteFolder} />
}
```

## React Query Integration

The component is designed to work seamlessly with React Query:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FolderTree } from '@/components/FolderTree'

function FolderTreeWithAPI() {
  const queryClient = useQueryClient()

  // Fetch folders
  const {
    data: folders,
    isLoading,
    error
  } = useQuery({
    queryKey: ['folders'],
    queryFn: fetchFolders
  })

  // Add folder mutation
  const addFolderMutation = useMutation({
    mutationFn: ({ parentId, name }: { parentId: string; name: string }) => addFolder(parentId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
    }
  })

  // Delete folder mutation
  const deleteFolderMutation = useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
    }
  })

  const handleAddFolder = async (parentId: string, folderName: string) => {
    await addFolderMutation.mutateAsync({ parentId, name: folderName })
  }

  const handleDeleteFolder = async (folderId: string) => {
    await deleteFolderMutation.mutateAsync(folderId)
  }

  return (
    <FolderTree
      folders={folders || []}
      selectedFolder={selectedFolder}
      onFolderSelect={handleFolderSelect}
      onAddFolder={handleAddFolder}
      onDeleteFolder={handleDeleteFolder}
      isLoading={isLoading}
      error={error?.message}
    />
  )
}
```

## API Reference

### FolderTree Props

| Prop             | Type                                                              | Required | Description                      |
| ---------------- | ----------------------------------------------------------------- | -------- | -------------------------------- |
| `folders`        | `FolderNode[]`                                                    | Yes      | Array of root folder nodes       |
| `selectedFolder` | `string`                                                          | Yes      | Currently selected folder ID     |
| `onFolderSelect` | `(folderId: string, folderName: string) => void`                  | Yes      | Callback when folder is selected |
| `onAddFolder`    | `(parentId: string, folderName: string) => Promise<void> \| void` | No       | Callback for adding folders      |
| `onDeleteFolder` | `(folderId: string) => Promise<void> \| void`                     | No       | Callback for deleting folders    |
| `isLoading`      | `boolean`                                                         | No       | Loading state for API operations |
| `error`          | `string \| null`                                                  | No       | Error message to display         |

### FolderNode Interface

```tsx
interface FolderNode {
  id: string // Unique identifier
  name: string // Display name
  type: 'folder' // Type identifier
  children: FolderNode[] // Child folders
  parentId?: string // Optional parent ID
  metadata?: {
    // Optional metadata
    createdAt?: string
    updatedAt?: string
    [key: string]: any
  }
}
```

## Custom Hooks

### useFolderTree

A custom hook for managing folder tree state:

```tsx
import { useFolderTree } from '@/components/FolderTree'

function MyComponent() {
  const { expandedNodes, toggleExpand, expandNode, collapseNode, expandAll, collapseAll } = useFolderTree({
    initialExpanded: ['root', 'folder-1']
  })

  // Use the hook methods...
}
```

## Component Architecture

```
FolderTree/
├── FolderTree.tsx          # Main component
├── TreeNode.tsx            # Individual node renderer
├── FolderActions.tsx       # Action menu component
├── AddFolderDialog.tsx     # Add folder dialog
├── hooks/
│   └── useFolderTree.ts    # State management hook
├── types.ts                # TypeScript definitions
├── index.ts                # Barrel exports
└── README.md               # Documentation
```

## Styling

The component uses Tailwind CSS classes and can be customized by:

1. **Overriding CSS classes**: The component uses semantic class names
2. **Custom themes**: Modify the color scheme by changing the Tailwind classes
3. **Size adjustments**: Modify padding, margins, and icon sizes as needed

## Performance Considerations

- **Virtualization**: For large trees (1000+ nodes), consider implementing virtualization
- **Memoization**: TreeNode components are optimized to prevent unnecessary re-renders
- **Lazy loading**: Implement lazy loading for deeply nested structures

## Accessibility

- **Keyboard navigation**: Full keyboard support for tree navigation
- **Screen reader support**: Proper ARIA labels and roles
- **Focus management**: Logical focus flow through the tree structure

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires ES2015+ support

## Contributing

When contributing to this component:

1. Maintain TypeScript strict mode compliance
2. Add comprehensive JSDoc comments
3. Include unit tests for new features
4. Follow the existing code style and patterns
5. Update this README for any API changes

## License

This component is part of the project and follows the same license terms.

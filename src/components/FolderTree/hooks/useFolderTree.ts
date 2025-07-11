/**
 * Custom hook for managing FolderTree state and logic
 *
 * This hook encapsulates all state management and business logic for the FolderTree component.
 * It provides a clean interface and can be easily extended for React Query integration.
 */

import { useState, useCallback } from 'react'
import type { FolderNode } from '../types'

export interface UseFolderTreeOptions {
  /** Initial set of expanded folder IDs */
  initialExpanded?: string[]
  /** Initial selected folder ID */
  initialSelected?: string
}

export interface UseFolderTreeReturn {
  /** Set of expanded folder IDs */
  expandedNodes: Set<string>
  /** Toggle expansion state of a folder */
  toggleExpand: (nodeId: string) => void
  /** Expand a specific folder */
  expandNode: (nodeId: string) => void
  /** Collapse a specific folder */
  collapseNode: (nodeId: string) => void
  /** Expand all folders */
  expandAll: (folders: FolderNode[]) => void
  /** Collapse all folders */
  collapseAll: () => void
}

/**
 * Custom hook for managing folder tree expansion state
 *
 * @param options - Configuration options for the hook
 * @returns Object containing expansion state and control functions
 */
export function useFolderTree(options: UseFolderTreeOptions = {}): UseFolderTreeReturn {
  const { initialExpanded = ['root'], initialSelected } = options

  // State for tracking which folders are expanded
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(initialExpanded))

  /**
   * Toggle the expansion state of a folder
   *
   * @param nodeId - ID of the folder to toggle
   */
  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }, [])

  /**
   * Expand a specific folder
   *
   * @param nodeId - ID of the folder to expand
   */
  const expandNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => new Set(prev).add(nodeId))
  }, [])

  /**
   * Collapse a specific folder
   *
   * @param nodeId - ID of the folder to collapse
   */
  const collapseNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      newSet.delete(nodeId)
      return newSet
    })
  }, [])

  /**
   * Recursively collect all folder IDs from a folder tree
   *
   * @param folders - Array of folder nodes
   * @returns Array of all folder IDs
   */
  const collectAllIds = useCallback((folders: FolderNode[]): string[] => {
    const ids: string[] = []

    const traverse = (nodes: FolderNode[]) => {
      nodes.forEach((node) => {
        ids.push(node.id)
        if (node.children.length > 0) {
          traverse(node.children)
        }
      })
    }

    traverse(folders)
    return ids
  }, [])

  /**
   * Expand all folders in the tree
   *
   * @param folders - Array of root folder nodes
   */
  const expandAll = useCallback(
    (folders: FolderNode[]) => {
      const allIds = collectAllIds(folders)
      setExpandedNodes(new Set(allIds))
    },
    [collectAllIds]
  )

  /**
   * Collapse all folders in the tree
   */
  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set())
  }, [])

  return {
    expandedNodes,
    toggleExpand,
    expandNode,
    collapseNode,
    expandAll,
    collapseAll
  }
}

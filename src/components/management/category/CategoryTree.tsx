'use client'
import React, { useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faSquare, faTag, faTags } from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

interface CategoryTreeItem {
  id: string;
  name: string;
  childrens?: CategoryTreeItem[];
  parentId?: string | null;
}

const initialCategories: Category[] = [
  { id: '1', name: 'Category 1' },
  { id: '2', name: 'Category 2' },
  { id: '3', name: 'Category 3' },
  { id: '4', name: 'Category 4', parentId: '1' },
  { id: '5', name: 'Category 5', parentId: '1' },
  { id: '6', name: 'Category 6', parentId: '4' },
  { id: '7', name: 'Category 7', parentId: '6' },
  { id: '8', name: 'Category 8', parentId: '3' },
];

const CategoryTree = ({categories:initialCategories}: {categories: Category[]}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: (categories.length + 1).toString(),
      name: newCategoryName,
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setNewCategoryName('');
  };

  const listToTree = (list: Category[]): CategoryTreeItem[] => {
    const map: { [key: string]: CategoryTreeItem } = {};
    const roots: CategoryTreeItem[] = [];
    let node: CategoryTreeItem;

    for (let i = 0; i < list.length; i += 1) {
      node = list[i];
      node.childrens = [];
      map[node.id] = node;
      if (!node.parentId) {
        roots.push(node);
      } else {
        map[node.parentId].childrens?.push(node);
      }
    }
    return roots;
  }

  const recursiveTree = (categories: CategoryTreeItem[]) => {
    return categories.map((category) => {
      if (category.childrens) {
        return (
          <TreeItem nodeId={category.id} label={category.name} key={category.id}>
            {recursiveTree(category.childrens)}
          </TreeItem>
        );
      }
      return (
        <TreeItem nodeId={category.id} label={category.name} key={category.id}  />
      );
    });
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
  };

  return (
    <div className="p-4">
      <TreeView
        defaultExpanded={['root']}
        defaultCollapseIcon={<FontAwesomeIcon icon={faTags} />}
        defaultExpandIcon={<FontAwesomeIcon icon={faTags} />}
        defaultEndIcon={<FontAwesomeIcon icon={faTag} />}
      >
        <TreeItem nodeId="root" label="Categories">
          {recursiveTree(listToTree(categories))}
        </TreeItem>
      </TreeView>
      <div className="mt-4">
        <TextField
          variant="outlined"
          label="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory} className="ml-2">
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryTree;

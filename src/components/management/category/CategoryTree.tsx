'use client'
import React, { useEffect, useState } from 'react';
import { Button, TextField, IconButton, Box, Typography, Stack } from '@mui/material';
import { TreeItem, TreeItemContentProps, TreeItemProps, TreeView, useTreeItem } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSquare, faSquareMinus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faXmark, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import CategoryForm from './CategoryForm';


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

const SquareXmarkIcon = () => {
  return (
    <span className="fa-layers fa-fw">
      <FontAwesomeIcon icon={faSquare} className='text-gray-400' />
      <FontAwesomeIcon icon={faXmark} className='text-gray-400' transform={{ size: 10, x: .6 }} />
    </span>
  );
}

const CategoryTree = ({categories: initialCategories}: {categories: Category[]}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [categoryTree, setCategoryTree] = useState<CategoryTreeItem[]>();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [createSubCategory, setCreateSubCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const CustomContent = React.forwardRef(function CustomContent(
    props: TreeItemContentProps,
    ref,
  ) {
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon,
    } = props;

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      preventSelection(event);
    };

    const handleExpansionClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      handleExpansion(event);
    };

    const handleSelectionClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      handleSelection(event);
    };

    const generateClassName = () => {
      return [
        className,
        classes.root,
        ...(expanded ? [classes.expanded] : []),
        ...(selected ? [classes.selected] : []),
        /*...(focused ? [classes.focused] : []),*/
        ...(disabled ? [classes.disabled] : []),
      ].join(' ');
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={generateClassName()}
        onMouseDown={handleMouseDown}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    );
  });

  function CustomTreeItem(props: TreeItemProps) {
    return <TreeItem ContentComponent={CustomContent} {...props} />;
  }

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: (categories.length + 1).toString(),
      name: newCategoryName,
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setNewCategoryName('');
  };

  const listToTree = (): CategoryTreeItem[] => {
    const map: { [key: string]: CategoryTreeItem } = {};
    const roots: CategoryTreeItem[] = [];
    let node: CategoryTreeItem;

    for (let i = 0; i < categories.length; i += 1) {
      node = categories[i];
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
          <CustomTreeItem nodeId={category.id} label={<div className='flex items-center'>
            <Typography className=''>{category.name}</Typography>
            <IconButton size='small' className='mx-6 p-0' onClick={(e)=>{e.stopPropagation(); setSelectedCategory(category); setCreateSubCategory(false)}}>
              <FontAwesomeIcon icon={faEdit}  />
            </IconButton>           
          </div>} key={category.id} >
            {category.childrens?.length > 0 &&
              <Box className="border-l-2 border-dotted border-gray-600 pl-4">
                {recursiveTree(category.childrens)}
              </Box>
            }

          </CustomTreeItem>
        );
      }
      return (
        <CustomTreeItem nodeId={category.id} label={
          <Typography className=''>{category.name}</Typography>
        } key={category.id} />
      );
    });
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
  };

  useEffect(() => {
    setSelectedCategory(null);
    setCategoryTree(listToTree());
    console.log("categories", categories)
  }, [categories]);

  return (
    <div className="p-4">
      <TreeView
        defaultExpanded={['root']}
        defaultCollapseIcon={<FontAwesomeIcon icon={faSquareMinus} className='ml-px fa-fw' />}
        defaultExpandIcon={<FontAwesomeIcon icon={faSquarePlus} className='ml-px fa-fw' />}
        defaultEndIcon={<SquareXmarkIcon />}
        selected={[selectedCategory?.id || '']}
        onNodeSelect={(event: React.ChangeEvent<{}>, nodeIds: string[]) => {
          console.log("nodeIds", typeof nodeIds);
          console.log("categories", categories);
          const categoryFinded = categories.find((category) => category.id == nodeIds.toString());
          if (categoryFinded && categoryFinded.id !== selectedCategory?.id) {
            console.log("categoryFinded", categoryFinded);
            setSelectedCategory(categoryFinded);
            setCreateSubCategory(true)
          } else {
            setSelectedCategory(null);
            setCreateSubCategory(false)
          }
        }}
      >
        {recursiveTree(categoryTree||[])}
      </TreeView>
      <div className="mt-4">       
        <CategoryForm onSaveComplete={()=>{setSelectedCategory({id: "", name:"", parentId: ""})}} categoryData={createSubCategory?{name:"", parentId: selectedCategory?.id}:selectedCategory} title={createSubCategory?"Create Sub Category of "+selectedCategory?.name:(selectedCategory?.id)?"Edit Category":"Create Root Category"} />
      </div>
    </div>
  );
};

export default CategoryTree;

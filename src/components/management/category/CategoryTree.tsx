'use client'
import React, { useEffect, useState } from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import { TreeItem, TreeItemContentProps, TreeItemProps, TreeView, useTreeItem } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSquare, faSquareMinus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import CategoryForm from './CategoryForm';
import { ProductCategoryDto } from '@/schemas/category';

const SquareXmarkIcon = () => {
    return (
        <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon={faSquare} className='text-gray-400' />
            <FontAwesomeIcon icon={faXmark} className='text-gray-400' transform={{ size: 10, x: .6 }} />
        </span>
    );
}

const CategoryTree = ({ categories }: { categories: ProductCategoryDto[] }) => {
    const [selectedCategory, setSelectedCategory] = useState<ProductCategoryDto | null>(null);
    const [createSubCategory, setCreateSubCategory] = useState(false);

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
    
    const recursiveTree = (categories: ProductCategoryDto[]) => {
        return categories.map((category) => {
            console.log("category", category);
            if (category.childrens) {
                return (
                    <CustomTreeItem nodeId={category.id?.toString()} label={<div className='flex items-center'>
                        <Typography className=''>{category.name}</Typography>
                        <IconButton size='small' className='mx-6 p-0' onClick={(e) => { e.stopPropagation(); setSelectedCategory(category); setCreateSubCategory(false) }}>
                            <FontAwesomeIcon icon={faEdit} />
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
                <CustomTreeItem nodeId={category.id?.toString()} label={
                    <Typography className=''>{category.name}</Typography>
                } key={category.id} />
            );
        });
    }

    useEffect(() => {
        setSelectedCategory(null);
        console.log("categories", categories)
    }, [categories]);

    const findIdOnTree = (id: number): ProductCategoryDto | null => {
        let result: ProductCategoryDto | null = null;
        categories?.forEach((category) => {
            if (category.id === id) {
                result = category;
            } else if (category.childrens) {
                result = findIdOnTree(id);
            }
        });
        return result;
    }

    return (
        <div className="p-4">
            <TreeView
                defaultExpanded={['root']}
                defaultCollapseIcon={<FontAwesomeIcon icon={faSquareMinus} className='ml-px fa-fw' />}
                defaultExpandIcon={<FontAwesomeIcon icon={faSquarePlus} className='ml-px fa-fw' />}
                defaultEndIcon={<SquareXmarkIcon />}
                selected={[selectedCategory?.id.toString() || '']}
                onNodeSelect={(event: React.ChangeEvent<{}>, nodeIds: string[]) => {
                    if (!nodeIds.includes(selectedCategory?.id?.toString()!)) {
                        const categoryFinded = findIdOnTree(selectedCategory?.id!);
                        console.log("categoryFinded", categoryFinded);
                        setSelectedCategory(categoryFinded);
                        setCreateSubCategory(true)
                    } else {
                        setSelectedCategory(null);
                        setCreateSubCategory(false)
                    }
                }}
            >
                {recursiveTree(categories || [])}
            </TreeView>
            <div className="mt-4">
                <CategoryForm onSaveComplete={() => { setSelectedCategory({ id: 0, name: "", parentId: 0, parent: null }) }} categoryData={createSubCategory ? { name: "", parentId: selectedCategory?.id } : selectedCategory} title={createSubCategory ? "Create Sub Category of " + selectedCategory?.name : (selectedCategory?.id) ? "Edit Category" : "Create Root Category"} />
            </div>
        </div>
    );
};

export default CategoryTree;

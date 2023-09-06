'use client'
import React, { useEffect, useState } from 'react';
import { IconButton, Box, Typography, Dialog, Button, Tooltip } from '@mui/material';
import { TreeItem, TreeItemContentProps, TreeItemProps, TreeView, useTreeItem } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSquare, faSquareMinus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faCircleDot, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import CategoryForm from './CategoryForm';
import { ProductCategoryDto } from '@/schemas/category';

const SquareXmarkIcon = () => {
    return (
        <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon={faSquare} className='text-gray-400' transform={{ size: 20 }}/>
            <FontAwesomeIcon icon={faCircle} className='text-gray-400' transform={{ size: 3, x: -0.8 }} />
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
        return categories.map((category, index) => {
            console.log("category", category);
            if (category.childrens) {
                return (
                    <CustomTreeItem
                        nodeId={category.id?.toString()}
                        label={<div className='flex items-center justify-between'>
                            <Typography className=''>{category.name}</Typography>
                            <Box className="py-2">
                                <Tooltip title="Crear Sub Categoria" arrow>
                                    <IconButton className='mx-2 drop-shadow-lg bg-gray-100 border-2' onClick={(e) => { e.stopPropagation(); setSelectedCategory(category); setCreateSubCategory(true) }}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </IconButton>
                                </Tooltip>
                                <IconButton className='mx-2 bg-gray-100 shadow-md border-2' onClick={(e) => { e.stopPropagation(); setSelectedCategory(category); setCreateSubCategory(false) }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </IconButton>
                            </Box>
                        </div>}
                        key={category.id}
                        className='rounded border bg-white' >
                        {category.childrens?.length > 0 &&
                            <Box className={index%2===0?`border-l-2 shadow-md pt-2 pb-1 border-dotted border-gray-600 pl-4 [&>*:nth-child(even)]:bg-white-200 [&>*:nth-child(odd)]:bg-slate-200`:"border-l-2 border-dotted border-gray-600 pl-4 [&>*:nth-child(even)]:bg-slate-200 [&>*:nth-child(odd)]:bg-white-200"}>
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

    const findIdOnTree = (id: number, categories: ProductCategoryDto[]): ProductCategoryDto | null => {
        let result: ProductCategoryDto | null = null;
        categories?.forEach((category) => {
            console.log("category", category);
            console.log("id", id);
            if (category.id === id) {
                result = category;
            } else if (category.childrens && category.childrens.length > 0) {
                result = findIdOnTree(id, category.childrens);
            }
        });
        return result;
    }

    return (
        <div className="p-4 w-full max-w-2xl">
            <TreeView
                defaultExpanded={['root']}
                defaultCollapseIcon={<FontAwesomeIcon icon={faSquareMinus} className='ml-px fa-fw' transform={{size:20}} />}
                defaultExpandIcon={<FontAwesomeIcon icon={faSquarePlus} className='ml-px fa-fw' transform={{size:20}} />}
                defaultEndIcon={<SquareXmarkIcon />}
                className='[&>*:nth-child(odd)]:bg-white-200 [&>*:nth-child(even)]:bg-slate-200'
                selected={[selectedCategory?.id.toString() || '']}
            >
                {recursiveTree(categories || [])}
            </TreeView>
            <div className="mt-8">
                <Button variant="contained" color="primary" fullWidth startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => { setSelectedCategory({ id: 0, name: "", parentId: 0, parent: null }); setCreateSubCategory(false) }}>Crear Categoría Principal</Button>
            </div>
            <Dialog open={selectedCategory !== null} onClose={() => { setSelectedCategory(null) }}>
                <CategoryForm onSaveComplete={() => { setSelectedCategory({ id: 0, name: "", parentId: 0, parent: null }) }} categoryData={createSubCategory ? { name: "", parentId: selectedCategory?.id } : selectedCategory} title={createSubCategory ? "Crear Sub Categoria de " + selectedCategory?.name : (selectedCategory?.id) ? "Editar Categoría" : "Crear Categoria Principal"} />
            </Dialog>
        </div>
    );
};

export default CategoryTree;

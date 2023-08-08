'use client'
import { forwardRef, useEffect, useState } from 'react';
import { Box, Chip, FormControl, InputAdornment, InputBaseComponentProps, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { TreeItem, TreeItemContentProps, TreeItemProps, TreeView, useTreeItem } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareMinus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';


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

const SquareXmarkIcon = () => {
    return (
        <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon={faSquare} className='text-gray-400' />
            <FontAwesomeIcon icon={faXmark} className='text-gray-400' transform={{ size: 10, x: .6 }} />
        </span>
    );
}

const CategoryTree = ({ categories: initialCategories, inputProps, onChange, ...props }: { categories: Category[], fullWidth?: boolean, size?: 'small' | 'medium', small?: boolean, className: string, inputProps?: InputBaseComponentProps, onChange: (event: string | React.ChangeEvent<Element>) => void }) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [expandedIds, setExpandedIds] = useState<string[]>(['root']);
    const [categoryTree, setCategoryTree] = useState<CategoryTreeItem[]>();
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const CustomContent = forwardRef(function CustomContent(
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
        } = props; props

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
                ...(selected ? [classes.selected, 'bg-blue-200 rounded-l'] : []),
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

    const listToTree = (categoriesList: Category[]): CategoryTreeItem[] => {
        const map = new Map();

        // Primero, mapeamos todos los nodos por su id en un diccionario
        categoriesList?.forEach((node) => {
            map.set(node.id, { ...node, childrens: [] });
        });

        // Luego, construimos la estructura del árbol usando el parent_id
        const tree: any[] = [];
        categoriesList?.forEach((node) => {
            const parent = map.get(node.parentId);
            if (parent) {
                parent.childrens.push(map.get(node.id));
            } else {
                tree.push(map.get(node.id));
            }
        });

        return tree;
    }

    const recursiveTree = (categories: CategoryTreeItem[]) => {
        return categories.map((category) => {
            if (category.childrens) {
                return (
                    <CustomTreeItem nodeId={category.id?.toString()} label={<div className='flex items-center hover:bg-blue-200 rounded px-1'>
                        <Typography className=''>{category.name}</Typography>
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
        console.log("listToTree categories", categories);
        setCategoryTree(listToTree(categories));
    }, [categories]);

    const [open, setOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        console.log("initialCategories", initialCategories)
        if (searchValue) {
            //search to not discard parents saved on parentId
            const categoriesFiltered = initialCategories.filter((category) => category.name.toLowerCase().includes(searchValue.toLowerCase()));

            const parents = new Array();

            //add parents to filtered categories
            categoriesFiltered.forEach((category) => {
                //search parents recursively
                const addParents = (categoryParam: Category) => {
                    const parent = initialCategories.find((category) => category.id === categoryParam.parentId);
                    if (parent) {
                        parents.push(parent);
                        addParents(parent);
                    }
                }
                addParents(category);

            });

            console.log("parents", parents);
            console.log("categoriesFiltered", categoriesFiltered);
            setExpandedIds(parents.map((parent) => parent.id));
            setCategories([
                ...categoriesFiltered,
                ...parents

            ]);
        } else {
            setExpandedIds(["root"]);
            setCategories(initialCategories);
        }
    }, [searchValue, initialCategories]);

    return (
        <FormControl {...props}>
            <InputLabel id="demo-multiple-chip-label">Categoría</InputLabel>
            <Select
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple={false}
                value={selectedCategory?.id || ""}
                input={<OutlinedInput id="select-multiple-chip" label="Categoría" />}
                renderValue={(value) => (
                    value &&
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        <Chip key={selectedCategory?.id} label={selectedCategory?.name} />
                    </Box>
                )}
                error={!!inputProps?.error}
            >
                <MenuItem value={0} className='hidden' />
                {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id} className='hidden' />
                ))}
                <Box>
                    <Box className="px-2 pb-1">
                        <OutlinedInput value={searchValue} onChange={(event) => { setSearchValue(event.target.value); }} size='small' fullWidth endAdornment={<InputAdornment position="end"><FontAwesomeIcon icon={faMagnifyingGlass} className='text-gray-400' /></InputAdornment>} placeholder='Filtro...'/>
                    </Box>
                    <TreeView
                        expanded={expandedIds}
                        onNodeToggle={(event: React.ChangeEvent<{}>, nodeIds: string[]) => {
                            setExpandedIds(nodeIds);
                        }}
                        defaultCollapseIcon={<FontAwesomeIcon icon={faSquareMinus} className='ml-px fa-fw' onClick={(e) => { e.preventDefault(); }} />}
                        defaultExpandIcon={<FontAwesomeIcon icon={faSquarePlus} className='ml-px fa-fw' onClick={(e) => { e.preventDefault(); }} />}
                        defaultEndIcon={<SquareXmarkIcon />}
                        onNodeSelect={(event: React.ChangeEvent<{}>, nodeIds: string[]) => {
                            const categoryFinded = categories.find((category) => category.id == nodeIds.toString());
                            if (categoryFinded && categoryFinded.id !== selectedCategory?.id) {
                                setSelectedCategory(categoryFinded);
                                onChange(categoryFinded.id);
                            } else {
                                setSelectedCategory(null);
                                onChange("");
                            }
                            setOpen(false);
                        }}
                    >
                        {recursiveTree(categoryTree || [])}
                    </TreeView>
                </Box>
            </Select>
        </FormControl>
    );
};

export default CategoryTree;
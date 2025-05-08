import React, { useState, useEffect } from 'react';
import './categories.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import chevronRight from '@iconify/icons-mdi/chevron-right';
import { Icon } from '@iconify/react';
import arrowUp from '@iconify/icons-mdi/chevron-up';
import arrowDown from '@iconify/icons-mdi/chevron-down';
import closeCircle from '@iconify/icons-mdi/close';
import Product from '../../component/product/product';
import { domain } from '../../api.service';

const Categories = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const [filters, setFilters] = useState({
        categories: [],
        subcategory: [],
        colors: [],
        priceRange: [0, 10000],
        sizes: [],
        pattern: [],
        fabric: [],
        fit: []
    });

    const [sortBy, setSortBy] = useState('lowToHigh');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // Check if there's a category in location state
        const categoryFromState = location.state?.category;
        
        if (categoryFromState) {
            if (categoryFromState === 'All') {
                // Show all products - clear category filter
                setFilters(prev => ({
                    ...prev,
                    categories: []
                }));
            } else {
                // Set the category filter
                setFilters(prev => ({
                    ...prev,
                    categories: [categoryFromState]
                }));
            }
        }
    }, [location.state]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams();

                for (const key in filters) {
                    if (filters[key].length > 0) {
                        queryParams.append(key, filters[key].join(','));
                    }
                }
                queryParams.append('minPrice', filters.priceRange[0]);
                queryParams.append('maxPrice', filters.priceRange[1]);
                queryParams.append('sortBy', sortBy);

                const response = await fetch(`${domain}/user/filterProduct?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err);
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, sortBy]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType].includes(value)
                ? prevFilters[filterType].filter(item => item !== value)
                : [...prevFilters[filterType], value],
        }));
    };

    const handlePriceRangeChange = (e) => {
        setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }));
    };

    const handleSortByChange = (value) => setSortBy(value);

    const handleCategoryClick = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    const availableCategories = ['Man', 'Woman', 'Other'];
    const availableSubCategories = selectedCategory
        ? [...new Set(products.filter(p => p.categories === selectedCategory).map(p => p.subcategory))]
        : [];
    const availableColors = ["Red", "Blue", "Green", "Pink", "White", "Black", "Grey", "Maroon", "Gold", "Yellow", "Orange", "Purple"];
    const availableSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
    const availablePatterns = ['Lucknowi', 'Printed', 'Plain', 'Embroidery', 'Other'];
    const availableFabrics = ['Cotton', 'Silk', 'Wool', 'Polyester', 'Linen'];
    const availableFits = ['Regular Fit', 'Slim Fit', 'Loose Fit', 'Drop Shoulder', 'Overfit'];

    const getFilterElements = () => {
        const elements = [];
        for (const filterType in filters) {
            if (filters[filterType].length > 0 && filterType !== "priceRange") {
                filters[filterType].forEach(filterValue => {
                    elements.push({
                        name: filterValue,
                        filterType,
                    });
                });
            }
        }
        return elements;
    };

    const filterSection = (name) => {
        return (
            <div className={`ProductListing-filter-section ${name || ""}`}>
                <div className="ProductListing-filter-group">
                    <div className='ProductListing-filter-title'>Categories</div>
                    {availableCategories.map((category) => (
                        <div key={category}>
                            <label className="ProductListing-category-item" onClick={() => handleCategoryClick(category)}>
                                <div className='ProductListing-category-name'>{category}</div>
                                <span className="ProductListing-category-arrow">
                                    <Icon
                                        icon={selectedCategory === category ? arrowUp : arrowDown}
                                        width="20"
                                        height="20"
                                    />
                                </span>
                            </label>
                            {selectedCategory === category && (
                                <div className="ProductListing-sub-categories">
                                    {availableSubCategories.map((subCategory) => (
                                        <label key={subCategory}>
                                            <input
                                                type="checkbox"
                                                value={subCategory}
                                                checked={filters.subcategory.includes(subCategory)}
                                                onChange={(e) => handleFilterChange("subcategory", e.target.value)}
                                            />
                                            {subCategory}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <hr color='#D9D9D9' />
                
                <FilterGroup 
                    title="Pattern"
                    options={availablePatterns}
                    selected={filters.pattern}
                    onChange={(val) => handleFilterChange("pattern", val)}
                />
                <hr color='#D9D9D9' />
                
                <FilterGroup 
                    title="Fabric"
                    options={availableFabrics}
                    selected={filters.fabric}
                    onChange={(val) => handleFilterChange("fabric", val)}
                />
                <hr color='#D9D9D9' />
                
                <FilterGroup 
                    title="Fit"
                    options={availableFits}
                    selected={filters.fit}
                    onChange={(val) => handleFilterChange("fit", val)}
                />
                <hr color='#D9D9D9' />
                
                <FilterGroup 
                    title="Colour"
                    options={availableColors}
                    selected={filters.colors}
                    onChange={(val) => handleFilterChange("colors", val)}
                    isColorFilter
                />
                <hr color='#D9D9D9' />
                
                <FilterGroup
                    title="Sizes"
                    options={availableSizes}
                    selected={filters.sizes}
                    onChange={(val) => handleFilterChange("sizes", val)}
                />
                <hr color='#D9D9D9' />
                
                <div className="ProductListing-filter-group">
                    <div style={{ textAlign: "justify", padding: "10px 0px", fontWeight: "600" }}>Price Range</div>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={filters.priceRange[1]}
                        onChange={handlePriceRangeChange}
                        id="price-range"
                        style={{ accentColor: '#DA231D' }}
                    />
                    <br />
                    <label style={{ textAlign: "justify", marginTop: "10px" }}>
                        Rs. 0 - Rs. {filters.priceRange[1]}
                    </label>
                </div>
            </div>
        )
    }

    const sortBysection = (name) => {
        return (
            <div className={`${name || ""}`}>
                <select className='ProductListing-sort-by ProductListing-sort-by-box' id="sort" value={sortBy} onChange={(e) => handleSortByChange(e.target.value)}>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>
            </div>
        );
    }

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleClick = (productId) => {
        navigate(`/product-details/${productId}`);
    };

    return (
        <div className='ProductListing-root'>
            <Drawer
                open={isDrawerOpen}
                onClose={toggleDrawer}
                zIndex={10000}
                direction="left"
                className="profile-drawer-content"
                overlayClassName="drawer-overlay"
            >
                {filterSection("")}
            </Drawer>
            
            <div className="breadcrumb">
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
                <Icon icon={chevronRight} style={{ fontSize: "20px" }} />
                <span style={{ color: '#DA231D' }}>Categories</span>
            </div>

            <div className="ProductListing-all-product-count">All Items - {products.length}</div>
            <div className='ProductListing-filter-button-sortby'>
                <div className="ProductListing-filter-button" onClick={toggleDrawer}>Filter</div>
                {sortBysection()}
            </div>
            
            <div className='ProductListing-filter-bar-root'>
                <div className="ProductListing-filter-text" style={{ minWidth: "270px", textAlign: "justify" }}> Filters</div>
                <div className="ProductListing-filter-bar" style={{ width: "100%", overflowX: 'auto' }}>
                    {getFilterElements().map((filterItem, index) => (
                        <div
                            key={index}
                            className={`ProductListing-filter-item ${filterItem.isSelected ? 'active' : ''}`}
                            onClick={() => handleFilterChange(filterItem.filterType, filterItem.name)}
                        >
                            <div className="ProductListing-filter-item-text">
                                {filterItem.name}
                                <Icon icon={closeCircle} width="20" height="20" />
                            </div>
                        </div>
                    ))}
                </div>
                {sortBysection("inMobile")}
            </div>
            
            <hr color='#ccc' width="100%" />
            
            <div className="ProductListing-container">
                {filterSection("inMobile")}
                <div className="ProductListing-product-list">
                    <div className="ProductListing-products">
                        {products.map((product) => (
                            <Product product={product} key={product._id} onClick={() => handleClick(product._id)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilterGroup = ({ title, options, selected, onChange, isColorFilter }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const itemsToShow = showAll ? options : options.slice(0, 5);

    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleShowAll = () => setShowAll(!showAll);

    return (
        <div className="ProductListing-filter-group">
            <h3
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={toggleOpen}
            >
                {title}
                <Icon icon={isOpen ? arrowUp : arrowDown} width={20} height={20} />
            </h3>
            {isOpen && (
                <>
                    {itemsToShow.map(option => (
                        <label key={option} className={isColorFilter ? 'ProductListing-color-filter-label' : ''}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={selected.includes(option)}
                                onChange={(e) => onChange(e.target.value)}
                            />
                            {isColorFilter ? (
                                <span className="ProductListing-color-box" style={{ backgroundColor: option }}></span>
                            ) : null}
                            {option}
                        </label>
                    ))}
                    {options.length > 5 && (
                        <button
                            onClick={toggleShowAll}
                            style={{
                                marginTop: "10px",
                                cursor: "pointer",
                                background: "none",
                                border: "none",
                                fontSize: "14px",
                                color: "#DA231D"
                            }}
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Categories;
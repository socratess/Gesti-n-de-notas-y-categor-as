package com.project.tagfilternotes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.tagfilternotes.dto.CategoryDTO;
import com.project.tagfilternotes.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    

    @Autowired
    private CategoryService categoryService;

 @GetMapping
    public List<CategoryDTO> getAllCategories(){
        return categoryService.getAllCategories();
    }
    

@PostMapping
   public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDTO){
    return categoryService.createCategory(categoryDTO); 
    }

 @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id){
        categoryService.deleteCategoryById(id);
        return ResponseEntity.noContent().build();
    }
}

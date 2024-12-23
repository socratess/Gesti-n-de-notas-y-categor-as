package com.project.tagfilternotes.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.tagfilternotes.dto.CategoryDTO;
import com.project.tagfilternotes.entity.CategoryEntity;
import com.project.tagfilternotes.entity.NoteEntity;
import com.project.tagfilternotes.exception.ResourceNotFound;
import com.project.tagfilternotes.repository.CategoryRepository;
import com.project.tagfilternotes.util.CategoryMapper;

import jakarta.transaction.Transactional;

@Service
public class CategoryService {
    
@Autowired
private CategoryRepository categoryRepository;

//@Autowired
//private NoteRepository noteRepository;

@Autowired
private CategoryMapper categoryMapper;

        @Transactional
        public List<CategoryDTO> getAllCategories() {
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
          return  categoryMapper.toDtoList(categoryEntities);
       
    }
    
    @Transactional
    public void deleteCategoryById(Long id) {
            CategoryEntity category =  (categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Category not found")));
         
            for(NoteEntity note: category.getNotes()){
              note.getCategories().remove(category);
            }
            categoryRepository.delete(category);
          }

    @Transactional
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
       return categoryMapper.toDto((categoryRepository.save(categoryMapper.toEntity(categoryDTO))));
    }



    @Transactional
    public List<CategoryEntity> FindOrCreateCategory(List<String> categoryNames){
     // for (String name : nameCategory) {
      //if(!categoryRepository.existsByName(name)){
      //  CategoryEntity categoryEntity = new CategoryEntity();
       // categoryEntity.setName(name);
        //categoryRepository.save(categoryEntity);

            return categoryNames.stream()
          .map(name -> categoryRepository.findByName(name)
                  .orElseGet(() -> {
                      CategoryEntity category = new CategoryEntity();
                      category.setName(name);
                      return categoryRepository.save(category);
                  }))
          .collect(Collectors.toList());

      }

    }
  



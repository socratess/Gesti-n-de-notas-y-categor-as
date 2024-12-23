package com.project.tagfilternotes.util;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.project.tagfilternotes.dto.CategoryDTO;
import com.project.tagfilternotes.entity.CategoryEntity;
import com.project.tagfilternotes.entity.NoteEntity;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    

    //CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);
    @Mapping(target="notes", qualifiedByName = "mapNoteTitle")
    CategoryDTO toDto(CategoryEntity categoryEntity);
    
    @Mapping(target="notes", ignore = true)
    CategoryEntity toEntity(CategoryDTO categoryDTO);
    
    
    List<CategoryDTO> toDtoList(List<CategoryEntity> categoryEntities);
    List<CategoryEntity> toEntityList(List<CategoryDTO> categoryDTOs);
    
    
    
     @Named("mapNoteTitle")
        default List<String> mapNoteTitles(List<NoteEntity> notes) {
            return notes.stream().map(NoteEntity::getTitle).collect(Collectors.toList());
        }
    

}

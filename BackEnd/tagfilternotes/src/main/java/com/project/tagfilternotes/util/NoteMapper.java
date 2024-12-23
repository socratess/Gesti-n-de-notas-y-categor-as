package com.project.tagfilternotes.util;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.project.tagfilternotes.dto.NoteDTO;
import com.project.tagfilternotes.entity.NoteEntity;
import com.project.tagfilternotes.entity.CategoryEntity;

@Mapper(componentModel = "spring")
public interface NoteMapper {
 
    //NoteMapper INSTANCE = Mappers.getMapper(NoteMapper.class);

//source = "categories",
    @Mapping(target="categories", qualifiedByName = "mapCategoryName")
    NoteDTO toDto(NoteEntity noteEntity);

    @Mapping(target="categories", ignore = true)
    NoteEntity toEntity(NoteDTO noteDTO);


    List<NoteDTO> toDtoList(List<NoteEntity> noteEntities);
    List<NoteEntity> toEntityList(List<NoteDTO> noteDTOs);



 @Named("mapCategoryName")
    default List<String> mapCategoryTitles(List<CategoryEntity> notes) {
        return notes.stream().map(CategoryEntity::getName).collect(Collectors.toList());
    }


}

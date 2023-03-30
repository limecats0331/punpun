package edu.ssafy.punpun.service;

import edu.ssafy.punpun.dto.response.FavoriteMenuDTO;
import edu.ssafy.punpun.entity.Child;
import edu.ssafy.punpun.entity.FavoriteMenu;
import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.Store;
import edu.ssafy.punpun.exception.NotStoreOwnerException;
import edu.ssafy.punpun.repository.FavoriteMenuRepository;
import edu.ssafy.punpun.repository.MenuRepository;
import edu.ssafy.punpun.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;
    private final FavoriteMenuRepository favoriteMenuRepository;

    @Override
    public Store findById(Long id) {
        return storeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게 입니다."));
    }

    public List<FavoriteMenuDTO> getStoreDetailChild(Store store, Child child) {
        List<FavoriteMenuDTO> favoriteMenuDTOList =
                menuRepository.findByStore(store).stream()
                        .map(menu -> {
                            Optional<FavoriteMenu> favoriteMenu = favoriteMenuRepository.findByChildAndMenu(child, menu);
                            if (favoriteMenu != null) {
                                return new FavoriteMenuDTO(menu, true);
                            } else {
                                return new FavoriteMenuDTO(menu, false);
                            }
                        })
                        .collect(Collectors.toList());
        return favoriteMenuDTOList;
    }

    @Override
    public List<Store> findByNameContaining(String name) {
        return storeRepository.findByNameContaining(name);
    }

    @Override
    public List<Store> findByOwner(Member member) {
        return storeRepository.findByOwner(member);
    }

    @Override
    public void deleteStoreByMember(Member member, Long storeId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 가게 입니다."));

        if (store.getOwner() == null || member.getId() != store.getOwner().getId()) {
            throw new NotStoreOwnerException("가게의 주인이 아닙니다.");
        }
        store.deleteOwner();
    }
}

package edu.ssafy.punpun.dto.response;

import edu.ssafy.punpun.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MenuResponseDTO {
    private Long menuId;
    private String menuName;
    private Long menuPrice;
    private Long menuCount;
    private String menuImageName;
    private String menuImage;

    public MenuResponseDTO(Menu menu) {
        this.menuId = menu.getId();
        this.menuName = menu.getName();
        this.menuPrice = menu.getPrice();
        this.menuCount = menu.getSponsoredCount();
        if (menu.getImage() != null) {
            this.menuImageName = menu.getImage().getName();
            this.menuImage = menu.getImage().getUrl();
        }
    }
}

package edu.ssafy.testutil;

import edu.ssafy.punpun.entity.Member;
import edu.ssafy.punpun.entity.enumurate.UserRole;
import edu.ssafy.punpun.security.oauth2.OAuth2Attributes;
import edu.ssafy.punpun.security.oauth2.PrincipalMemberDetail;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

public class WithMockCustomOwnerSecurityContextFactory implements WithSecurityContextFactory<WIthCustomOwner> {
    @Override
    public SecurityContext createSecurityContext(WIthCustomOwner annotation) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        Member member = Member.builder()
                .id(1L)
                .name("name")
                .email("email@email.com")
                .role(UserRole.OWNER)
                .build();
        OAuth2Attributes attributes = OAuth2Attributes.builder()
                .name(member.getName())
                .email(member.getEmail())
                .build();
        PrincipalMemberDetail principal = new PrincipalMemberDetail(member, attributes);
        Authentication auth = new UsernamePasswordAuthenticationToken(principal, principal.getPassword(), principal.getAuthorities());
        context.setAuthentication(auth);
        return context;
    }
}

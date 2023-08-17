package com.fpoly.Controller_User;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@PreAuthorize("isAuthenticated()")
public class Wishlist {
	
	
	@GetMapping("/wishlist")
	public String wishlist(Model model) {
		
		return "wishlist";
	}
}

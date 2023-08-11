package com.fpoly.Service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fpoly.DAO.ProductDAO;
import com.fpoly.Entity.Item;
import com.fpoly.Entity.Product;
import com.fpoly.Service.CartService;

@Service
public class CartServiceImpl implements CartService{

	@Autowired
	ProductDAO dao;

	Map<Integer, Item> map = new HashMap<>();

	ArrayList<Product> list = new ArrayList<Product>();

	@Override
	public Item addCart(Integer id) {
		Item item = map.get(id);
		if (item == null) {
			item = new Item();
			Product p = new Product();
			List<Product> list = dao.findAll();
			p = list.stream().filter(it -> it.getId() == id).collect(Collectors.toList()).get(0);
			item.setId(p.getId());
			item.setName(p.getName());
			item.setImg(p.getImg());
			item.setPrice(p.getPrice());
			item.setQty(1);
			map.put(id, item);
		} else {
			item.setQty(item.getQty() + 1);
		}
		return item;
	}

	@Override
	public void remove(Integer id) {
		map.remove(id);
	}

	@Override
	public void clear() {
		map.clear();
	}

	@Override
	public Collection<Item> getItems() {
		return map.values();
	}

//	@Override
//	public List<Item> getItems() {
//		for (Integer i : map.keySet()) {
//			list.add(map.get(i));
//		}
//		return list;
//	}

	@Override
	public int getCount() {
		return map.values().stream().mapToInt(item -> item.getQty()).sum();
	}

	@Override
	public double getAmount() {
		return map.values().stream().mapToDouble(item -> item.getPrice() * item.getQty()).sum();
	}
	
	
	

}

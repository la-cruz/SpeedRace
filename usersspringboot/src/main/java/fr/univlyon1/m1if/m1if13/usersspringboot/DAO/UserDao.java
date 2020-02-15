package fr.univlyon1.m1if.m1if13.usersspringboot.DAO;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import fr.univlyon1.m1if.m1if13.usersspringboot.model.User;

public class UserDao implements Dao<User> {
     
    private List<User> users = new ArrayList<>();
     
    public UserDao() {
        users.add(new User("Slocaly", "mdpS"));
        users.add(new User("Mickatsu", "mdpM"));
    }
     
    @Override
    public Optional<User> get(String id) {
        return Optional.ofNullable(users.get((Integer.parseInt(id))));
    }
     
    @Override
    public Set<String> getAll() {
        Set<String> userLogin = new HashSet<>();
        for(User user : users) {
            userLogin.add(user.getLogin());
        }
        return userLogin;
    }
     
    @Override
    public void save(User user) {
        users.add(user);
    }
     
    @Override
    public void update(User user, String[] params) {
        user.setLogin(Objects.requireNonNull(
          params[0], "Login cannot be null"));
        user.setPassword(Objects.requireNonNull(
          params[1], "Password cannot be null"));
         
        users.add(user);
    }
     
    @Override
    public void delete(User user) {
        users.remove(user);
    }
}
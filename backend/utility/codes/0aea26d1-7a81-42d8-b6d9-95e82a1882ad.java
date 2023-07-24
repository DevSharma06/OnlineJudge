import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        String word = s.nextLine();
        if(word.length() != 1) {
            System.out.println("error");
        } else if(word.toUpperCase().equals(word)) {
            System.out.println("upper");
        } else {
            System.out.println("abc");
        }
    }
}
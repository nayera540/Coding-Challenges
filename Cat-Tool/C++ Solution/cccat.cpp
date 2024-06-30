#include <iostream>
#include <stdio.h>
#include <fstream>
#include <string>

using namespace std;

void read_file(string path){
    ifstream file;
    file.open(path);
    string file_content;
    if(file.is_open()){
        while(getline(file, file_content)){
            cout << file_content << endl;
        }
        file.close();
    }
}

int main(int argc, char* argv[]) {
    if(argc == 2){
        if(string(argv[1]) == "-"){
            istream& input = cin;
            string line;
            while(getline(input, line)) {
                cout << line << endl;
            }
            return 0;
        }
        else if(string(argv[1]) == "-n" || string(argv[1]) == "-b"){
            istream& input = cin;
            string line;
            int number_line = 1;
            while(getline(input, line)) {
                if(string(argv[1]) == "-b" && line.empty()){
                    cout << line << endl;
                    continue;
                }
                cout << number_line << "  " << line << endl;
                number_line++;
            }
            return 0;
        }
        read_file(argv[1]);
    }
    else if(argc > 2){
        for(int i = 1; i < argc; i++){
            read_file(argv[i]);
        }
    }


    return 0;
}
